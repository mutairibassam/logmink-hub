const mongoose = require("mongoose");
const { Schema, model } = mongoose;

function mask(payload, sensitiveKeys = ['password', 'pass', 'token', 'ssn', 'secret', 'authorization']) {    
  if (typeof payload !== 'object' || payload === null) {
    return payload;
  }

  const sanitizedPayload = Array.isArray(payload) ? [] : {};

  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      if (typeof payload[key] === 'object') {
        sanitizedPayload[key] = mask(payload[key], sensitiveKeys);
      } else if (sensitiveKeys.includes(key.toLowerCase())) {
        sanitizedPayload[key] = '***************';
      } else {
        sanitizedPayload[key] = payload[key];
      }
    }
  }
  return sanitizedPayload;
}

const HeaderSchema = new Schema({
  Date: String,
  Connection: String,
  Authorization: String,
  "Keep-Alive": String,
  "Content-Security-Policy": String,
  "Cross-Origin-Opener-Policy": String,
  "Cross-Origin-Resource-Polic": String,
  "Origin-Agent-Cluster": String,
  "Referrer-Policy": String,
  "Strict-Transport-Security": String,
  "X-Content-Type-Options": String,
  "X-DNS-Prefetch-Control": String,
  "X-Download-Options": String,
  "X-Frame-Options": String,
  "X-Permitted-Cross-Domain-Policies": String,
  "X-XSS-Protection": String,
  "Access-Control-Allow-Origin": String,
  "Access-Control-Allow-Methods": String,
  "Access-Control-Allow-Headers": String,
  "Content-Type": String,
  "Content-Length": String,
  "User-Agent": String,
  /// to add more...
});

const logsSchema = new Schema({
  level: String,
  httpVersion: String,
  code: Number,
  message: Schema.Types.Mixed,
  timestamp: {
    type: String,
    trim: true,
  },
  method: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
  payload: {
    type: Object,
  },
  from: {
    type: String,
    trim: true,
  },
  to: {
    type: String,
    trim: true,
  },
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
  },
  headers: {
    type: HeaderSchema,
  },
  // auto-generated
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

// used to hide secret keys
RequestSchema.pre("save", function(next) {  
  this.payload = mask(this.payload);
  next();
});

/// used to hide secret keys
HeaderSchema.pre("save", function(next) {
this.Authorization = '***************';
next();
});

const logs = model("log", logsSchema);
module.exports = logs;
