/** @type {import("jest").Config} */
export default {
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  transform: {
    // 테스트만 CommonJS 로 변환 (앱 tsconfig 는 Next 용 ESNext)
    "^.+\\.ts$": ["ts-jest", { tsconfig: { module: "commonjs", moduleResolution: "node", isolatedModules: true } }],
  },
};
