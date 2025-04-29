import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
const getSongsUrl = `${import.meta.env.VITE_BASE_URL}/song/getSongs`;
const addSongUrl = `${import.meta.env.VITE_BASE_URL}/song/addSong`;
const deleteSongUrl = `${import.meta.env.VITE_BASE_URL}/song/deleteSong`;

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [songImage, setSongImage] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(getSongsUrl, {
          withCredentials: true,
        });
        setSongs(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSongs();
  }, []);

  const [showDetails, setShowDetails] = useState(false);
  const [songId, setSongId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowDetails = (id) => {
    if (id !== songId) {
      setShowDetails(true);
      setSongId(id);
    }
    if (id === songId && showDetails) {
      setShowDetails(false);
    }
    if (id === songId && !showDetails) {
      setShowDetails(true);
    }
    console.log(id);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${deleteSongUrl}/${id}`, {
        withCredentials: true,
      });
      setSongs((prevSongs) => prevSongs.filter((song) => song._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !songFile || !songImage) {
      alert("Please fill all required fields.");
      return;
    }
    const submitSong = async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("album", album);
      formData.append("year", year);
      formData.append("duration", duration);
      formData.append("language", language);
      formData.append("audio", songFile);
      formData.append("image", songImage);

      genre.split(",").forEach((cat) => {
        formData.append("genre", cat.trim());
      });

      try {
        const result = await axios.post(addSongUrl, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (result) {
          setSongs((prev) => [...prev, result.data.data]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    submitSong();

    setTitle("");
    setArtist("");
    setAlbum("");
    setYear("");
    setGenre("");
    setDuration("");
    setLanguage("");
    setSongFile(null);
    setSongImage(null);
    e.target.reset();
  };

  return (
    <div>
      <section className="content">
        <main>
          <h4>Songs</h4>
          <div
            className="table-data"
            style={showDetails ? { gap: "15px" } : {}}
          >
            <div className="order">
              <div className="head">
                <div className="head-main">Songs List</div>
                <i className="fa-solid fa-plus" onClick={handleShow} />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Preview</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map((song) => (
                    <tr key={song._id}>
                      <td>
                        <img
                          src={song.image}
                          alt={song.title}
                          width="60"
                          height="60"
                        />
                      </td>
                      <td>{song.title}</td>
                      <td>
                        <audio controls>
                          <source src={song.audio} type="audio/mpeg" />
                          Your browser does not support the audio tag.
                        </audio>
                      </td>
                      <td className="d-flex gap-1">
                        <span
                          className="status pending"
                          onClick={() => handleDelete(song._id)}
                        >
                          <i className="fas fa-trash" />
                        </span>

                        <span
                          className="status complete"
                          onClick={() => handleShowDetails(song._id)}
                        >
                          <i className="fa-solid fa-list" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`todo ${showDetails && "active"}`}>
              {songId ? (
                <div
                  style={{
                    padding: "20px",
                    width: "300px",
                  }}
                >
                  <div className="head">
                    <h3>🎵 Song Details</h3>
                    <i className="fa-solid fa-pen-to-square" />
                  </div>

                  <p>
                    <strong>Title:</strong>{" "}
                    {songs.find((i) => i._id === songId).title}
                  </p>
                  <p>
                    <strong>Artist:</strong>{" "}
                    {songs.find((i) => i._id === songId).artist}
                  </p>
                  <p>
                    <strong>Album:</strong>{" "}
                    {songs.find((i) => i._id === songId).album}
                  </p>
                  <p>
                    <strong>Release Year:</strong>{" "}
                    {songs.find((i) => i._id === songId).year}
                  </p>
                  <p>
                    <strong>Genre:</strong>{" "}
                    {songs.find((i) => i._id === songId).genre.join(", ")}
                  </p>
                  <p>
                    <strong>Duration:</strong>{" "}
                    {songs.find((i) => i._id === songId).duration}
                  </p>
                  <p>
                    <strong>Language:</strong>{" "}
                    {songs.find((i) => i._id === songId).language}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </main>
      </section>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Song</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit} className="mb-4">
          <Modal.Body>
            <div className="row">
              <div className="mb-3 col-md-4">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 col-md-4">
                <label className="form-label">Artist</label>
                <input
                  type="text"
                  className="form-control"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 col-md-4">
                <label className="form-label">Album</label>
                <input
                  type="text"
                  className="form-control"
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                />
              </div>

              <div className="mb-3 col-md-4">
                <label className="form-label">Year</label>
                <input
                  type="number"
                  className="form-control"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>

              <div className="mb-3 col-md-4">
                <label className="form-label">Genre (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>

              <div className="mb-3 col-md-4">
                <label className="form-label">Duration (e.g., 3:45)</label>
                <input
                  type="text"
                  className="form-control"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="mb-3 col-md-4">
                <label className="form-label">Language</label>
                <input
                  type="text"
                  className="form-control"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
              </div>

              <div className="mb-3 col-md-4">
                <label className="form-label">Song File (MP3)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="audio/*"
                  onChange={(e) => setSongFile(e.target.files[0])}
                  required
                />
              </div>

              <div className="mb-3 col-md-4">
                <label className="form-label">Song Image (JPG/PNG)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setSongImage(e.target.files[0])}
                  required
                />
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" className="btn btn-primary">
              Upload
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
