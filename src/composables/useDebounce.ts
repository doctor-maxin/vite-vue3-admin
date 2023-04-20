export function useDebounce() {
    const debounce = (fn: any, ms: number) => {
        let timeout;

        return function () {
            const fnCall = () => {
                // @ts-ignore
                fn.apply(this, arguments)
            }
            clearTimeout(timeout)
            timeout = setTimeout(fnCall, ms)
        }
    }

    return { debounce }
}