export function shouldIndexPage(pageUrl) {
  return ![
    'https://kidscoloringpage.com/404',
    'https://kidscoloringpage.com/admin/dashboard/',
    'https://kidscoloringpage.com/dashboard/',
    'https://kidscoloringpage.com/verify-account/',
  ].includes(pageUrl);
}
