export function handleMongooseError(error, res) {
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err) => err.message);
    res.status(400).json({ error: "Validation Error", messages });
  } else {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
}
