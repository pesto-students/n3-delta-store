import en from './en.json'
import hi from './hi.json'

export const translate = (key, lang) => {
    switch (lang) {
        case "hi":
            return hi[key] ? hi[key] : key

        default:
            return en[key] ? en[key] : key
    }
}