import { useState } from "react";

const ExpandCard = ({ children, initialExpand, disabled = false }) => {
    const [isExpand, setIsExpand] = useState(initialExpand)

    const expand = () => {
        if (disabled) return
        setIsExpand(!isExpand)
    }

    return (
        <div className={`overflow-hidden ${isExpand? "max-h-auto" : "max-h-24"}`} onClick={expand}>
            {children}
        </div>
    )
}

export default ExpandCard;
