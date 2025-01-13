import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder: string
    classNames?: string
    register?: UseFormRegisterReturn
}

const TextareaUI = ({placeholder, classNames, register, ...props}: Props) => {
    return (
        <textarea {...props} {...register} placeholder={placeholder} className={twMerge('w-full h-32 outline-blue-500 resize-none px-10 py-2 text-md border rounded-md', classNames)}></textarea>
    );
}

export default TextareaUI;
