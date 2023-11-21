import { expect, test } from 'vitest';
import { toCamelCase, toSnakeCase } from './helpers';

test('toCamelCase transforms object keys into camelCase recursively', () => {
  const l = [
    {
      first_name: 'John',
      invoices: [
        {
          id: 1,
          amount: 100,
          created_at: '2021-01-01',
        },
        {
          id: 2,
          amount: 100,
          created_at: '2021-02-01',
        },
      ],
    },
  ];

  const result = toCamelCase(l) as Array<Record<string, unknown>>;
  expect(result.length).toEqual(1);
  expect(result[0]).toHaveProperty('firstName');
  expect(result[0]).toHaveProperty('invoices');
  const itemInvoices = result[0]['invoices'] as Array<Record<string, unknown>>;
  expect(itemInvoices[0]).toHaveProperty('createdAt');
  expect(itemInvoices[1]).toHaveProperty('createdAt');
});

test('toSnakeCase transforms object keys into snake_case recursively', () => {
  const l = [
    {
      firstName: 'John',
      invoices: [
        {
          id: 1,
          amount: 100,
          createdAt: '2021-01-01',
        },
      ],
    },
  ];

  const result = toSnakeCase(l) as Array<Record<string, unknown>>;
  expect(result.length).toEqual(1);
  expect(result[0]).toHaveProperty('first_name');
  expect(result[0]).toHaveProperty('invoices');
  const itemInvoices = result[0]['invoices'] as Array<Record<string, unknown>>;
  expect(itemInvoices[0]).toHaveProperty('created_at');
});
