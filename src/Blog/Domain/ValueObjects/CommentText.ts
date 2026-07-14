import ValueObject from "src/common/Domain/ValueObject";

export default class CommentText extends ValueObject<string> {
    static readonly REGEX = /[^<>]{3,150}$/
    static fromInput(value: string) {
        if (!CommentText.REGEX.test(value))
            throw new Error()

        return new CommentText(value)
    }

    static fromValid(value: string) {
        return new CommentText(value)
    }
}