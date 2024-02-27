import { DefaultSpinner } from './DefaultSpinner';

type LoadingMessageProps = {
  message: string;
};

export function LoadingMessage(props: LoadingMessageProps) {
  const { message } = props;

  return (
    <div>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/80 backdrop-blur">
        <div className="flex items-center justify-center rounded-md border bg-white px-4 py-2 shadow-lg">
          <DefaultSpinner
            className={'h-4 w-4 md:h-5 md:w-5'}
            innerFill="#000000"
          />
          <h1 className="ml-2 text-base font-light md:text-xl">
            {message}
            <span className="animate-pulse"></span>
          </h1>
        </div>
      </div>
    </div>
  );
}
