export const CabeceraBody = ({ path }) => {
    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">
                            {path.substring(1).charAt(0).toUpperCase() +
                                path.slice(2)}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
