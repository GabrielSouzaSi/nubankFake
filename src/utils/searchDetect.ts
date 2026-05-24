// utils/searchDetect.ts
export type SearchKind = "email" | "pix_random" | "cpf" | "cnpj" | "phone" | "name"

const onlyDigits = (s: string) => s.replace(/\D/g, "")

export function isValidEmail(s: string) {
    const v = s.trim().toLowerCase()
    // regex simples e suficiente p/ maioria dos casos
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export function isUUIDv4(s: string) {
    const v = s.trim()
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)
}

export function isValidCPF(raw: string) {
    const s = onlyDigits(raw)
    if (s.length !== 11) return false
    if (/^(\d)\1+$/.test(s)) return false
    const calc = (base: string, factor: number) => {
        let sum = 0
        for (let i = 0; i < base.length; i++) sum += Number(base[i]) * (factor - i)
        const rest = (sum * 10) % 11
        return rest === 10 ? 0 : rest
    }
    const d1 = calc(s.slice(0, 9), 10)
    const d2 = calc(s.slice(0, 10), 11)
    return d1 === Number(s[9]) && d2 === Number(s[10])
}

export function isValidCNPJ(raw: string) {
    const s = onlyDigits(raw)
    if (s.length !== 14) return false
    if (/^(\d)\1+$/.test(s)) return false
    const calc = (base: string, factors: number[]) => {
        let sum = 0
        for (let i = 0; i < base.length; i++) sum += Number(base[i]) * factors[i]
        const rest = sum % 11
        return rest < 2 ? 0 : 11 - rest
    }
    const f1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const f2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const d1 = calc(s.slice(0, 12), f1)
    const d2 = calc(s.slice(0, 13), f2)
    return d1 === Number(s[12]) && d2 === Number(s[13])
}

/** Telefone BR: aceita com/sem +55, com DDD. Retorna em E.164 (+55XXXXXXXXXXX) se possível. */
export function normalizePhoneBR(raw: string) {
    let digits = onlyDigits(raw)
    // se já vier com 55, mantém; senão, adiciona se tiver 10-11 dígitos (DDD + número)
    if (digits.startsWith("55")) {
        const len = digits.length
        if (len >= 12 && len <= 13) return `+${digits}` // 55 + 10/11
        return null
    } else {
        if (digits.length === 10 || digits.length === 11) return `+55${digits}`
        return null
    }
}

export function detectSearchKind(raw: string): { kind: SearchKind; normalized: string } {
    const v = raw.trim()

    // 1) email
    if (isValidEmail(v)) return { kind: "email", normalized: v.toLowerCase() }

    // 2) chave aleatória Pix (UUID v4)
    if (isUUIDv4(v)) return { kind: "pix_random", normalized: v.toLowerCase() }

    // 3) cpf
    const digits = onlyDigits(v)
    if (digits.length === 11 && isValidCPF(digits)) {
        return { kind: "cpf", normalized: digits }
    }

    // 4) cnpj
    if (digits.length === 14 && isValidCNPJ(digits)) {
        return { kind: "cnpj", normalized: digits }
    }

    // 5) telefone (BR)
    const phone = normalizePhoneBR(v)
    if (phone) return { kind: "phone", normalized: phone }

    // 6) fallback: nome
    return { kind: "name", normalized: v }
}

// --- (opcional) máscaras para exibir bonito no input ---
export const maskCPF = (digits: string) => {
    const v = onlyDigits(digits).slice(0, 11)
    const p1 = v.slice(0, 3)
    const p2 = v.slice(3, 6)
    const p3 = v.slice(6, 9)
    const p4 = v.slice(9, 11)
    let out = p1
    if (p2) out += "." + p2
    if (p3) out += "." + p3
    if (p4) out += "-" + p4
    return out
}

export const maskCNPJ = (digits: string) => {
    const v = onlyDigits(digits).slice(0, 14)
    return v
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
}

export const maskPhoneBR = (digits: string) => {
    const v = onlyDigits(digits).slice(0, 11)
    if (v.length <= 10) {
        // (DD) XXXX-XXXX
        return v
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2")
    }
    // (DD) 9XXXX-XXXX
    return v
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
}
