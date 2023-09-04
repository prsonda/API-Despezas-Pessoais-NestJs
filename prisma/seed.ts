const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const categories = [
    'Alimentação',
    'Assinaturas e Serviços',
    'Aluguel',
    'Mercado',
    'Cuidados Pessoais',
    'Educação',
    'Família',
    'Lazer',
    'Pets',
    'Presentes',
    'Roupas',
    'Saúde',
    'Transporte',
    'Salário',
    'Vendas',
    'Outras receitas',
    'Outras despesas',
  ];

  for (let category in categories) {
    await prisma.categoria.create({
      data: {
        descricao: category,
      },
    });
  }
}

main();

prisma.$disconnect();
