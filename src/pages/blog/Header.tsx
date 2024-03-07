import copy from 'copy-text-to-clipboard';
import { toast } from 'sonner';

type Props = {
  title: string;
  publishedOn: string;
  subtitle?: string;
  postImage?: string;
};

export function Header(props: Props) {
  function openShareWindow(platform: 'facebook' | 'twitter' | 'linkedin') {
    let url = '';
    const pageUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(props.title);

    // Define the dimensions of the popup.
    const popupWidth = 600;
    const popupHeight = 400;

    // Calculate the position to center the popup.
    const left = window.screen.width / 2 - popupWidth / 2;
    const top = window.screen.height / 2 - popupHeight / 2;

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrl}`;
        break;
      default:
        console.log('Unsupported platform');
        return;
    }

    // Construct the features string incorporating the calculated position.
    const features = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;

    // Open the popup centered on the screen.
    window.open(url, 'shareWindow', features);
  }

  return (
    <div className="flex flex-col">
      <h1>{props.title}</h1>
      <div className="mb-4 flex flex-col justify-between gap-y-2 md:flex-row">
        <div className="flex gap-x-3">
          <div
            onClick={() => openShareWindow('facebook')}
            className="cursor-pointer hover:text-[#F36A3C]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </div>
          <div
            onClick={() => openShareWindow('twitter')}
            className="cursor-pointer hover:text-[#F36A3C]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </div>
          <div
            onClick={() => {
              copy(window.location.href);
              toast.info('Link copied to clipboard');
            }}
            className="cursor-pointer hover:text-[#F36A3C]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
        </div>
        <div>
          <span>Published: {props.publishedOn}</span>
        </div>
      </div>
      {props?.postImage && (
        <div className="flex justify-center hover:text-[#F36A3C]">
          <img
            loading="lazy"
            src={props?.postImage}
            alt="Post thumbnail"
            className="h-64 w-full object-cover"
          />
        </div>
      )}
      {props?.subtitle && (
        <div className="mt-4">
          <blockquote className="border-l-4 border-black pl-4 italic">
            <p>{props.subtitle}</p>
          </blockquote>
        </div>
      )}
    </div>
  );
}
