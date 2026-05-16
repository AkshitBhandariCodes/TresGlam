import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Send } from "lucide-react";

interface FeedbackEntry {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
}

const STORAGE_KEY = "tresglam_feedback";

function loadFeedback(): FeedbackEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as FeedbackEntry[]) : [];
  } catch {
    return [];
  }
}

function saveFeedback(entries: FeedbackEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function Feedback() {
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setEntries(loadFeedback());
  }, []);

  useEffect(() => {
    saveFeedback(entries);
  }, [entries]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    const newEntry: FeedbackEntry = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      rating: formData.rating,
      message: formData.message.trim(),
      createdAt: new Date().toISOString(),
    };

    setEntries((prev) => [newEntry, ...prev]);
    setFormData({ name: "", rating: 5, message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#FFF7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#9C5A4A] text-xs uppercase tracking-[0.25em] font-medium mb-4">
            FEEDBACK
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#2A1E1A] mb-4">
            Share your glow story
          </h2>
          <p className="text-[#6B5C56] text-base max-w-xl mx-auto">
            Your feedback helps us craft even more beautiful experiences. Leave a
            note and see it appear instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-[#F2E7E4] p-6 sm:p-8 shadow-xl shadow-[#EAD6CF]/40"
          >
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-[#2A1E1A]">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                  placeholder="Ariana"
                  className="mt-2 w-full rounded-xl border border-[#EAD6CF] px-4 py-3 text-sm text-[#2A1E1A] placeholder-[#A58A82] focus:border-[#E7B7AE] focus:outline-none focus:ring-2 focus:ring-[#E7B7AE]/40"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2A1E1A]">
                  Rating
                </label>
                <div className="mt-2 flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setFormData({ ...formData, rating: value })}
                      className="w-9 h-9 rounded-full border border-[#EAD6CF] flex items-center justify-center hover:border-[#9C5A4A] transition-colors"
                      aria-label={`Rate ${value} stars`}
                    >
                      <Star
                        size={16}
                        className={
                          value <= formData.rating
                            ? "fill-[#E7B7AE] text-[#E7B7AE]"
                            : "text-[#C9B2AB]"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#2A1E1A]">
                  Feedback
                </label>
                <textarea
                  value={formData.message}
                  onChange={(event) =>
                    setFormData({ ...formData, message: event.target.value })
                  }
                  placeholder="Tell us about your TresGlam ritual..."
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-[#EAD6CF] px-4 py-3 text-sm text-[#2A1E1A] placeholder-[#A58A82] focus:border-[#E7B7AE] focus:outline-none focus:ring-2 focus:ring-[#E7B7AE]/40"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-[#2A1E1A] py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 hover:bg-[#3B2B25] transition-colors"
              >
                <Send size={16} />
                Send feedback
              </button>
              {submitted && (
                <p className="text-sm text-[#58A38B]">
                  Thank you! Your feedback is live below.
                </p>
              )}
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {entries.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#EAD6CF] bg-white/60 p-10 text-center text-[#A58A82]">
                No feedback yet. Be the first to share your glow story.
              </div>
            ) : (
              entries.slice(0, 5).map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-3xl bg-white border border-[#F2E7E4] p-6 shadow-md shadow-[#EAD6CF]/30"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-[#2A1E1A]">
                      {entry.name}
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(entry.rating)].map((_, index) => (
                        <Star
                          key={index}
                          size={14}
                          className="fill-[#E7B7AE] text-[#E7B7AE]"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#6B5C56]">{entry.message}</p>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
