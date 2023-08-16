import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { UserContext } from '../contexts/user.context';

function MusicCard() {
const { user } = useContext(UserContext);
let uuid = user.id;

const handleDownload = async () => {
    const response = await fetch(`/api/download/${uuid}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${uuid}.mp3`;
    document.body.appendChild(a);
    a.click();
    a.remove();
   };
const handleDelete = async () => {
    await fetch(`/api/delete/${uuid}`, { method: 'DELETE' });
    window.location.reload(true);
  };
  return (
    <Card>
      <Card.Header>Recent Mix Music</Card.Header>
      <Card.Body>
        <Card.Title>Artist : </Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary" onClick={handleDownload}>Download</Button>
        <Button variant="primary" onClick={handleDelete}>Delete</Button>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default MusicCard;