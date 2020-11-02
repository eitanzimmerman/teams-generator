import {useState, useCallback, useEffect} from 'react';
import copy from 'copy-to-clipboard';

const useCopyToClipboard = (resetInterval=null) => {
    const [isCopied, setCopy] = useState(false)

    const handleCopy = useCallback((text) => {
        if (typeof(text) == "string" || typeof(text) == "number"){
            copy(text.toString());
            setCopy(true)
        } else {
            setCopy(false)
            console.log('error with input');
        }
    }, [])

    useEffect(() => {
        let timeout;
        if (isCopied && resetInterval) {
            timeout = setTimeout(() => setCopy(false), resetInterval);
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [isCopied, resetInterval]);

    return [isCopied, handleCopy]

}



export default useCopyToClipboard;