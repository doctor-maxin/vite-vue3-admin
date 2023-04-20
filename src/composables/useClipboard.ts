import {Ref} from 'vue'

export function useCode() {
    const copy = (ref: Ref<any>) => {
        // ref.select()
        // let code: string = self.crypto.randomUUID()
        // code = code.replaceAll('-', '')
        navigator.clipboard.writeText(ref.value)
        return;
    }

    return { copy }
}