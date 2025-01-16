const ScrollTopButton = () => {

    const handleScrollToTop = () => {
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    } 

    return (
        <button onClick={handleScrollToTop} type="button" className="rounded-full bg-sky-400 font-bold text-zinc-700/50 w-9 h-9 relative before:content-['∧']">          
        </button>
    );
}

export default ScrollTopButton;
