import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
const getSongsUrl = `${import.meta.env.VITE_BASE_URL}/song/getSongs`;
const addSongUrl = `${import.meta.env.VITE_BASE_URL}/song/addSong`;
const deleteSongUrl = `${import.meta.env.VITE_BASE_URL}/song/deleteSong`;

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [categories, setCategories] = useState("");
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
      await axios.delete(`${deleteSongUrl}/${id}`);
      setSongs((prevSongs) => prevSongs.filter((song) => song._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!songName || !songFile || !songImage) {
      alert("Please fill all required fields.");
      return;
    }

    const newSong = {
      _id: new Date().getTime(),
      name: songName,
      artist,
      album,
      year,
      categories: categories.split(",").map((cat) => cat.trim()),
      duration,
      language,
      audio: URL.createObjectURL(songFile),
      image: URL.createObjectURL(songImage),
    };
    const submitSong = async () => {
      const formData = new FormData();
      formData.append("name", songName);
      formData.append("artist", artist);
      formData.append("album", album);
      formData.append("year", year);
      formData.append("duration", duration);
      formData.append("language", language);
      formData.append("audio", songFile);
      formData.append("image", songImage);

      categories.split(",").forEach((cat) => {
        formData.append("categories", cat.trim());
      });

      try {
        await axios.post(addSongUrl, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
    submitSong();

    setSongs([...songs, newSong]);

    setSongName("");
    setArtist("");
    setAlbum("");
    setYear("");
    setCategories("");
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
                <i class="fa-solid fa-plus" onClick={handleShow}></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Song Name</th>
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
                          alt={song.name}
                          width="60"
                          height="60"
                        />
                      </td>
                      <td>{song.name}</td>
                      <td>
                        <audio controls>
                          <source src={song.audio} type="audio/mpeg" />
                          Your browser does not support the audio tag.
                        </audio>
                      </td>
                      <td className="d-flex gap-1">
                        <span
                          class="status pending"
                          onClick={() => handleDelete(song._id)}
                        >
                          <i class="fas fa-trash"></i>
                        </span>
                        <span
                          className="status complete"
                          onClick={() => handleShowDetails(song._id)}
                        >
                          <i class="fa-solid fa-list"></i>
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
                  <div class="head">
                    <h3>🎵 Song Details</h3>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </div>
                  <p>
                    <strong>Title:</strong>{" "}
                    {songs.find((i) => i._id === songId).name}
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
                    <strong>Categories:</strong>{" "}
                    {songs.find((i) => i._id === songId).categories.join(", ")}
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
                <label className="form-label">Song Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
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
                <label className="form-label">
                  Categories (comma separated)
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
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
