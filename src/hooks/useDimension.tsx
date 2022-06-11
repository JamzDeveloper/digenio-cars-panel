import React from 'react'

const useDimension = () => {
    const [width, setWidth] = React.useState(0)
    const [height, setHeight] = React.useState(0)
    
    React.useLayoutEffect(() => {
        function updateSize() {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])
    
    return { width, height }

}

export default useDimension