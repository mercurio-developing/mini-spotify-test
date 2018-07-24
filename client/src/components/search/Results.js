import React from "react";

export default props => {
  console.log(props);
  return (
    <table className="table col-lg-12 col-xl-12 m-0">
      <thead className="border">
        <tr>
          <th scope="col" className="border-right" style={{ width: "20%" }}>
            Artist
          </th>
          <th scope="col" className="border-right" style={{ width: "40%" }}>
            Track
          </th>
          <th scope="col" style={{ width: "40%" }}>
            Album
          </th>
        </tr>
      </thead>
      <tbody>
        {props.tracks.map(track => (
          <tr key={track.id}>
            <td className="border-right border-bottom">
              {track.artists[0].name}
            </td>
            <td className="border-right border-bottom">{track.name}</td>
            <td className="border-right border-bottom">{track.album.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
