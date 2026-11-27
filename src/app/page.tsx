"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { DashboardLayout } from "@/components/spotify/DashboardLayout";
import { Sidebar } from "@/components/spotify/Sidebar";
import { AudioPlayer } from "@/components/spotify/AudioPlayer";
import { MOCK_PLAYLISTS, MOCK_TRACKS, Track } from "@/data/mockData";

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>(MOCK_TRACKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(MOCK_TRACKS[2]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [formError, setFormError] = useState("");

  const filteredTracks = useMemo(() => {
    return tracks.filter((track) => {
      const matchesArtist = selectedArtist
        ? track.artist.toLowerCase().includes(selectedArtist.toLowerCase())
        : true;
      const matchesSearch =
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesArtist && matchesSearch;
    });
  }, [tracks, selectedArtist, searchQuery]);

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!currentTrack || filteredTracks.length === 0) return;
    const idx = filteredTracks.findIndex((t) => t.id === currentTrack.id);
    const nextTrack = filteredTracks[(idx + 1) % filteredTracks.length];
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!currentTrack || filteredTracks.length === 0) return;
    const idx = filteredTracks.findIndex((t) => t.id === currentTrack.id);
    const prevIdx = (idx - 1 + filteredTracks.length) % filteredTracks.length;
    setCurrentTrack(filteredTracks[prevIdx]);
    setIsPlaying(true);
  };

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
      duration: "4:10",
      coverGradient: "from-emerald-600 to-zinc-950",
    };

    setTracks([newTrack, ...tracks]);
    setCurrentTrack(newTrack);
    setIsPlaying(true);
    setTitle("");
    setArtist("");
    setFormError("");
    setIsModalOpen(false);
  };

  return (
    <>
      <DashboardLayout
        sidebar={
          <Sidebar
            selectedArtist={selectedArtist}
            onSelectArtist={setSelectedArtist}
            onOpenAddModal={() => setIsModalOpen(true)}
          />
        }
        player={
          <AudioPlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        }
      >
        <div className="space-y-8 pb-6">
          {/* Üst Axtarış Paneli */}
          <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:max-w-md">
              <Input
                isSearch
                placeholder="Mahnı və ya sənətçi axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4" /> Yeni Mahnı
            </Button>
          </header>

          {/* Seçilmiş Playlistlər */}
          {!selectedArtist && !searchQuery && (
            <section>
              <h2 className="text-xl font-bold mb-4">
                Seçilmiş Sənətçilər və Playlistlər
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {MOCK_PLAYLISTS.map((pl) => (
                  <Card
                    key={pl.id}
                    title={pl.title}
                    description={pl.description}
                    type={pl.type}
                    coverGradient={pl.coverGradient}
                    onPlay={() => setSelectedArtist(pl.title)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Mahnı Siyahısı */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {selectedArtist ? `${selectedArtist} Trekləri` : "Bütün Mahnılar"}{" "}
                ({filteredTracks.length})
              </h2>
              {selectedArtist && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedArtist(null)}
                >
                  Filtri sıfırla
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredTracks.slice(0, 28).map((track) => (
                <Card
                  key={track.id}
                  title={track.title}
                  description={`${track.artist} • ${track.duration}`}
                  coverGradient={track.coverGradient}
                  onPlay={() => handlePlayTrack(track)}
                />
              ))}
            </div>
          </section>
        </div>
      </DashboardLayout>

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
    </>
  );
}