export function useCode() {
    const generateCode = () => {
        let code: string = self.crypto.randomUUID()
        code = code.replaceAll('-', '')

        return code.slice(0, 16)
    }

    return { generateCode }
}