import React, { ComponentProps } from 'react';
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'
import { LuLoader } from 'react-icons/lu'

interface TProps extends ComponentProps<'button'> {
    children: React.ReactNode
    className?: string
    Icon?: IconType
    iconSize?: number
    loading?: boolean 
}

const ButtonUI = ({children, className, Icon, iconSize = 20, loading = false, ...props}: TProps) => {
    return (
        <button {...props} disabled={props.disabled || loading} className={twMerge('flex items-center justify-center rounded-lg bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed', className)}>
            {!loading && Icon && <Icon size={iconSize} />}
            {!loading ? children : <LuLoader size={iconSize} className="animate-spin"/>}
        </button>
    );
}

export default ButtonUI;
