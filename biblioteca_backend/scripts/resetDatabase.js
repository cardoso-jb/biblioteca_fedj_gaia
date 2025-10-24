// biblioteca_backend/scripts/resetDatabase.js

const fs = require('fs');
const path = require('path');
const sequelize = require('../db/connection'); // conexão existente
const { Sequelize } = require('sequelize');

async function resetDatabase() {
  try {
    // Caminho do banco de dados SQLite
    const dbPath = path.join(__dirname, '../db/database.sqlite');

    console.log('🧹 Reiniciando o banco de dados...');
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
      console.log(`🗑️  Banco de dados antigo removido: ${dbPath}`);
    } else {
      console.log('ℹ️ Nenhum banco de dados anterior encontrado.');
    }

    // Recria o banco com as tabelas do Sequelize
    await sequelize.sync({ force: true });
    console.log('✅ Banco de dados recriado com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao resetar o banco de dados:', err);
    process.exit(1);
  }
}

resetDatabase();
