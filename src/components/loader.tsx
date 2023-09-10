const Loader: () => JSX.Element = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-accent"></div>
            <div className="badge badge-accent badge-lg m-5">Loading...</div>
        </div>
    )
}

export default Loader;