
import type {Variants} from 'framer-motion';

export const questionVariants: Variants = {
    initial: {
        opacity: 0,
        x: 50
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        x: -50,
        transition: {
            duration: 0.3
        }
    }
};

export const formElementVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            delay: custom * 0.1,
            ease: "easeOut"
        }
    })
};

export const buttonHoverVariants: Variants = {
    initial: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1
        }
    }
};

export const progressVariants: Variants = {
    initial: { width: 0 },
    animate: (custom: number) => ({
        width: `${custom * 100}%`,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    })
};

export const summaryItemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            delay: custom * 0.08,
            ease: "easeOut"
        }
    })
};