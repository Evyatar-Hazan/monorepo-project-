// Prisma client stub - disabled due to generation issues
// TODO: Fix Prisma schema and re-enable generation

interface StubModel {
  create: (data: any) => Promise<any>;
  findUnique: (filter: any) => Promise<any>;
  findMany: (filter?: any) => Promise<any[]>;
  update: (data: any) => Promise<any>;
  delete: (filter: any) => Promise<any>;
  [key: string]: any;
}

const createStubModel = (): StubModel => ({
  create: async () => {
    throw new Error('Prisma not configured');
  },
  findUnique: async () => {
    throw new Error('Prisma not configured');
  },
  findMany: async () => [],
  update: async () => {
    throw new Error('Prisma not configured');
  },
  delete: async () => {
    throw new Error('Prisma not configured');
  },
});

const prisma: any = {
  user: createStubModel(),
  comment: createStubModel(),
  $connect: async () => {
    console.log('[Prisma] Skipped - disabled');
  },
  $disconnect: async () => {
    console.log('[Prisma] Skipped - disabled');
  },
};

export default prisma;
