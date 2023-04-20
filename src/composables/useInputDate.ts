export function useInputDate() {
    const toString = (value?: string | Date): string => {
        let d = value ? new Date(value) : new Date()
        
        if (value instanceof Date) {
            d = value
        }
        console.log(d, value)
        const m = String(d.getMonth() + 1)
        const dt = d.getDate().toString()
        return `${d.getFullYear()}-${m.length === 1 ? '0' + m : m}-${dt.length === 1 ? '0' + dt : dt }`
    }

    return { toString }
}