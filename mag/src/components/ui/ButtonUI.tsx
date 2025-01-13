import React from 'react';
import { twMerge } from 'tailwind-merge'

interface TProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    innerText: string | React.ReactNode
    className?: string
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

const ButtonUI = ({innerText, className, Icon, ...props}: TProps) => {
    return (
        <button {...props} className={twMerge('rounded-lg bg-blue-500 text-white', className)}>
            {Icon && <Icon className='w-5 h-5' />}
            {innerText}
        </button>
    );
}

export default ButtonUI;
