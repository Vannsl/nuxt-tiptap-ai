<template>
  <header>
    <NuxtLink to="/" class="hover:underline"> Back home </NuxtLink>
    <h1 class="text-7xl font-semibold my-10">Imprint</h1>
  </header>
  <p class="mb-4">
    This page was built by Vanessa Otto.
    <ImprintLink href="https://www.vannsl.io/imprint">
      Click here for the imprint of vannsl.io
    </ImprintLink>
  </p>
  <p class="mb-2">
    I would like to express our sincere gratitude to the following open-source
    and paid libraries and frameworks, and individuals, whose invaluable
    contributions have played a significant role in the development of our
    project:
  </p>
  <ul class="ml-4 list-disc">
    <li>
      <ImprintLink href="https://nuxt.com/">Nuxt</ImprintLink>
    </li>
    <li>
      <ImprintLink href="https://tailwindcss.com/">TailwindCSS</ImprintLink> &
      <ImprintLink href="https://tailwindui.com/">TailwindUI</ImprintLink>
    </li>
    <li>
      <ImprintLink href="https://heroicons.com/">HeroIcons</ImprintLink>
    </li>
    <li>
      <ImprintLink href="https://www.lichter.io/"
        >Alexander Lichter</ImprintLink
      >
    </li>
  </ul>
</template>
