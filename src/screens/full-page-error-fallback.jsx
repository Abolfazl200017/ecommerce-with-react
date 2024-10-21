/* eslint-disable react/prop-types */

function FullPageErrorFallback({ error }) {
    return <>
        <div>
            status is {error.status}
        </div>
        <div>
            message of error is {error.message}
        </div>
    </>
}

export default FullPageErrorFallback