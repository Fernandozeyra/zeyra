import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome do projeto é obrigatório'],
    trim: true,
    minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
    maxlength: [120, 'Nome não pode exceder 120 caracteres']
  },
  data: {
    type: String,
    required: [true, 'Data (conteúdo) é obrigatória'],
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuário é obrigatório']
  }
}, {
  timestamps: true,
  collection: 'projects'
});

projectSchema.index({ user: 1, createdAt: -1 });

projectSchema.pre('save', function(next) {
  if (this.name) this.name = this.name.trim();
  if (this.data) this.data = this.data.trim();
  next();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;


