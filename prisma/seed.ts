const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const categoryData = [
    {
      name: 'Alimentação',
      description: 'Alimentos e bebidas',
    },
    {
      name: 'Assinaturas e Serviços',
      description: 'TV, internet, celular, etc',
    },
    {
      name: 'Aluguel',
      description: 'Aluguel, condomínio, etc',
    },
    {
      name: 'Mercado',
      description: 'Supermercado, padaria, etc',
    },
    {
      name: 'Cuidados Pessoais',
      description: 'Academia, cabeleireiro, etc',
    },
    {
      name: 'Educação',
      description: 'Cursos, livros, etc',
    },
    {
      name: 'Família',
      description: 'Despesas com filhos, etc',
    },
    {
      name: 'Lazer',
      description: 'Viagens, bares, restaurantes, etc',
    },
    {
      name: 'Pets',
      description: 'Ração, veterinário, etc',
    },
    {
      name: 'Presentes',
      description: 'Presentes para amigos e familiares',
    },
    {
      name: 'Roupas',
      description: 'Roupas, calçados, etc',
    },
    {
      name: 'Saúde',
      description: 'Plano de saúde, remédios, etc',
    },
    {
      name: 'Transporte',
      description: 'Ônibus, metrô, uber, etc',
    },
    {
      name: 'Salário',
      description: 'Salário recebido',
    },
    {
      name: 'Vendas',
      description: 'Vendas de mercadorias e serviços',
    },
    {
      name: 'Outras receitas',
      description: 'Outras receitas',
    },
    {
      name: 'Outras despesas',
      description: 'Outras despesas',
    },
  ];

  for (const data of categoryData) {
    await prisma.categories.create({
      data,
    });
  }

  console.log('Seed da tabela "categories" criada com sucesso.');
}

main()
  .catch((error) => {
    console.error('Erro ao criar a seed:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
