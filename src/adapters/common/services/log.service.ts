// eslint-disable-next-line @typescript-eslint/ban-types
type GConstructor = new (...args: any) => {};

export default function LogService<TBase extends GConstructor>(
  Base: TBase,
): GConstructor {
  return class LogService extends Base {
    constructor(...args: any[]) {
      super(...args);
    }

    logError(error: Error): void {
      console.log(
        '🚀 ~ file: log.service.ts ~ line 8 ~ LogService ~ logError ~ error',
        error,
      );
    }
  };
}
