import { useEffect } from 'react';

export function Faqs() {
  useEffect(() => {
    const faqQuestions = document?.querySelectorAll('.faq-question');

    faqQuestions.forEach(function (question) {
      question.addEventListener('click', function () {
        const title = question.querySelector('p');
        const icon = question.querySelector('img');

        // Toggle the font weight of the question
        title.classList.toggle('font-light');
        title.classList.toggle('font-bold');

        // rotate the question icon 90 degrees
        icon.classList.toggle('rotate-90');
        icon.classList.toggle('-rotate-90');

        // Toggle the hidden class for the corresponding answer
        const answer = question.nextElementSibling;
        answer.classList.toggle('hidden');

        // hide all other answers
        faqQuestions.forEach(function (faqQuestion) {
          if (faqQuestion !== question) {
            faqQuestion.nextElementSibling.classList.add('hidden');
            faqQuestion.querySelector('p').classList.add('font-light');
            faqQuestion.querySelector('p').classList.remove('font-bold');
            faqQuestion.querySelector('img').classList.add('rotate-90');
            faqQuestion.querySelector('img').classList.remove('-rotate-90');
          }
        });
      });
    });
  }, []);

  return (
    <div className="bg-[#FFF2DF]" id="faqs">
      <div className="px-responsive container px-4 py-12 md:px-0 md:py-20">
        <p className="mb-12 font-sansita text-4xl font-bold">
          Frequently asked questions
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="mb-6 flex flex-col gap-y-3">
              <div className="faq-question flex cursor-pointer flex-row items-baseline gap-x-6">
                <p className="flex-1 text-xl font-light">
                  What is KidsColoringPage.com?
                </p>
                <img
                  src="/icon-angle-right.png"
                  alt="icon-angel-right"
                  className="h-auto w-[10px] rotate-90"
                />
              </div>
              <p className="faq-answer hidden font-light">
                KidsColoringPage.com is an AI-powered coloring page generator!
                Perfect for parents, teachers, adults, and Sunday School
                instructors alike, KidsColoringPage.com transforms your
                imagination into coloring adventures. Whether you're aiming to
                entertain your kids, engage your students, or find a moment of
                peace and creativity for yourself, this tool is designed to
                cater to all your coloring needs. It's as simple as envisioning
                what you want on a page – from educational themes to personal
                relaxation or church activities – KidsColoringPage.com brings it
                to life. If coloring pages are a staple in your routine, look no
                further than KidsColoringPage.com to create them effortlessly!
              </p>
            </div>
            <div className="mb-6 border border-dashed border-[#CCCAC7] opacity-60" />
          </div>
          <div className="flex flex-col">
            <div className="mb-6 flex flex-col gap-y-3">
              <div className="faq-question flex cursor-pointer flex-row items-baseline gap-x-6">
                <p className="flex-1 text-xl font-light">
                  Can I use the images I create to make my own coloring books to
                  sell?
                </p>
                <img
                  src="/icon-angle-right.png"
                  alt="icon-angel-right"
                  className="h-auto w-[10px] rotate-90"
                />
              </div>
              <p className="hidden font-light">
                Yes! You can use the images you create for any purpose,
                including commercial use.
              </p>
            </div>
            <div className="mb-6 border border-dashed border-[#CCCAC7] opacity-60" />
          </div>
          <div className="flex flex-col">
            <div className="mb-6 flex flex-col gap-y-3">
              <div className="faq-question flex cursor-pointer flex-row items-baseline gap-x-6">
                <p className="flex-1 text-xl font-light">
                  Can I request for a refund if my kid(s) didn't like it?
                </p>
                <img
                  src="/icon-angle-right.png"
                  alt="icon-angel-right"
                  className="h-auto w-[10px] rotate-90"
                />
              </div>
              <p className="faq-answer hidden font-light">
                Yes! We offer a 2-day refund policy. If your kid(s) aren't happy
                with our coloring pages, please contact us within 2 days of
                purchase for a full refund.
              </p>
            </div>
            <div className="mb-6 border border-dashed border-[#CCCAC7] opacity-60" />
          </div>
          <div className="flex flex-col">
            <div className="mb-6 flex flex-col gap-y-3">
              <div className="faq-question flex cursor-pointer flex-row items-baseline gap-x-6">
                <p className="flex-1 text-xl font-light">
                  How long does it take to refund the amount?
                </p>
                <img
                  src="/icon-angle-right.png"
                  alt="icon-angel-right"
                  className="h-auto w-[10px] rotate-90"
                />
              </div>
              <p className="faq-answer hidden font-light">
                We process refund requests swiftly! Once you've submitted your
                request, we aim to process your refund within 24 hours.
              </p>
            </div>
            <div className="mb-6 border border-dashed border-[#CCCAC7] opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
}
