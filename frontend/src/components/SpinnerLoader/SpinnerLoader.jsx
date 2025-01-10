import './SpinnerLoader.css'
export default function SpinnerLoader() {

    const showSpinner = true
    return (
        <>
            <div className='spinner'>
                {
                    showSpinner ? ( 
                    <>
                        <img src="../../../Spinner_green.svg" />
                        <p>Loading...</p>
                    </>
                    ) : ''
                }
            </div>
        </>
    )
}