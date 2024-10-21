import { Spinner } from 'reactstrap'

function FullPageSpinner() {
    return <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
        <Spinner
            color="warning"
        >
            Loading...
        </Spinner>
    </div>
}

export default FullPageSpinner