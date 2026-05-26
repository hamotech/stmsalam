module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      excludedFiles: [
        'frontend/src/admin/**',
        'frontend/functions/scripts/**',
        'shared/productDomainGuard.js',
      ],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: "MemberExpression[object.name='product'][property.name='active']",
            message: 'Use available only. product.active is forbidden.',
          },
          {
            selector: "MemberExpression[object.name='p'][property.name='active']",
            message: 'Use available only. product.active is forbidden.',
          },
          {
            selector: "CallExpression[callee.name='collection'] Literal[value='products']",
            message: 'Use shared/useProductsCore.js only for product access',
          },
          {
            selector: "CallExpression[callee.name='getDocs'] CallExpression[callee.name='collection'] Literal[value='products']",
            message: 'Use shared/useProductsCore.js only for product access',
          },
        ],
      },
    },
    /** Read-model firewall: non-domain code must use `getOrderContext` accessors. */
    {
      files: ['frontend/src/**/*.{js,jsx,ts,tsx}'],
      excludedFiles: ['frontend/src/admin/orderPipeline.js'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '../orderPipeline.js',
                importNames: ['normalizePaymentMethod', 'normalizeCanonicalPaymentStatus'],
                message:
                  'Use getOrderContext(order).paymentMethodNorm / .paymentStatusNorm (versioned read model). Low-level helpers stay domain-internal.',
              },
              {
                name: '@/src/domain/orderPipeline',
                importNames: ['normalizePaymentMethod', 'normalizeCanonicalPaymentStatus'],
                message:
                  'Use getOrderContext(order).paymentMethodNorm / .paymentStatusNorm (versioned read model). Low-level helpers stay domain-internal.',
              },
            ],
          },
        ],
      },
    },
  ],
};

