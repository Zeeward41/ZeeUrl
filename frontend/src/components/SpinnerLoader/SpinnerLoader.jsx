import './SpinnerLoader.css'
export default function SpinnerLoader() {

    const showSpinner = true
    return (
        <>
            <div className='spinner'>
                {
                    showSpinner ? ( 
                    <>
                        <img src="../../../public/Spinner_green.svg" />
                        <p>Loading...</p>
                    </>
                    ) : ''
                }
            </div>
        </>
    )
}