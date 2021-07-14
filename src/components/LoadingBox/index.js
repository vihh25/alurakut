

export default function LoadingBox(props) {

    return (
        props.isLoading ? 
            <div style={{ width: '100vw', height: '100vh', backgroundColor: '#bbbbbb99', position: 'absolute', zIndex: 200, justifyContent: 'center' }}>
                <div className="loader"></div>
            </div>
        : <div/>
    );

}