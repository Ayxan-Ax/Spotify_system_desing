"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { MOCK_PLAYLISTS, MOCK_TRACKS, Track } from "@/data/mockData";

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>(MOCK_TRACKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Yeni mahnı formu üçün state-lər
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [formError, setFormError] = useState("");

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) {
      setFormError("Mahnı adı və sənətçi mütləq doldurulmalıdır.");
      return;
    }

    const newTrack: Track = {
      id: `t-${Date.now()}`,
      title: title.trim(),
      artist: artist.trim(),
      album: "Custom Single",
      duration: "3:45",
      coverGradient: "from-emerald-600 to-zinc-950",
    };

    setTracks([newTrack, ...tracks]);
    setTitle("");
    setArtist("");
    setFormError("");
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-spotify-base text-content-primary p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Üst panel: Axtarış və Modal düyməsi */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:max-w-md">
            <Input
              isSearch
              placeholder="Mahnı və ya sənətçi axtar (məs: Metallica, Rammstein)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4" /> Yeni Mahnı
          </Button>
        </header>

        {/* Playlistlər */}
        <section>
          <h2 className="text-xl font-bold mb-4">Seçilmiş Sənətçilər və Playlistlər</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {MOCK_PLAYLISTS.map((pl) => (
              <Card
                key={pl.id}
                title={pl.title}
                description={pl.description}
                type={pl.type}
                coverGradient={pl.coverGradient}
              />
            ))}
          </div>
        </section>

        {/* Mahnılar (ilk 24 nəticə göstərilir ki, səhifə yüngül qalsın) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              Mahnılar ({filteredTracks.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {filteredTracks.slice(0, 24).map((track) => (
              <Card
                key={track.id}
                title={track.title}
                description={`${track.artist} • ${track.duration}`}
                coverGradient={track.coverGradient}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Yeni Mahnı Modalı */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Siyahıya Yeni Mahnı Əlavə Et"
      >
        <form onSubmit={handleAddTrack} className="space-y-4">
          <Input
            label="Mahnı Adı"
            placeholder="Məs: Starless"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Sənətçi"
            placeholder="Məs: King Crimson"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            error={formError}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Ləğv et
            </Button>
            <Button type="submit">Əlavə et</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}