// errorLogger.middleware.js
export default function errorLogger(err, req, res, next) {
  console.error('----- ERROR DETECTADO -----');
  console.error('URL:', req.originalUrl);
  console.error('Método:', req.method);
  console.error('Body:', req.body);
  console.error('Error:', err);
  console.error('--------------------------');
  next(err); // Pasa el error al siguiente middleware (el manejador de errores)
}
