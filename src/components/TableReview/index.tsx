import { ITable } from "../../store/csvStore";

const CsvReview = ({ data }: { data: ITable }) => {
    const headers = data?.header?.length ? data.header : []
    return (
        <>
            {headers.length === 0 ? (
                <p>No data available.</p>
            ) : (
                <table
                    style={{
                        borderCollapse: "collapse",
                        width: "100%",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        color: "#ffffff",
                                        backgroundColor: "#6D95E0",
                                        borderBottom: "1px solid #ddd",
                                        padding: "15px",
                                        textAlign: "left",
                                    }}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.slice(0, 5).map((row, index) => (
                            <tr key={index}>
                                {headers.map((header, columnIndex) => (
                                    <td key={columnIndex} style={tableCellStyle}>
                                        {row[header]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

const tableCellStyle = {
    fontSize: "14px",
    fontWeight: 500,
    borderBottom: "1px solid #ddd",
    padding: "15px",
    backgroundColor: "#fff",
};

export default CsvReview;