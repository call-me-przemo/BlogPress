"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const now = new Date();
    await queryInterface.bulkInsert("Posts", [
      {
        title: "Lorem ipsum dolor sit amet",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis sed odio morbi quis commodo odio aenean sed. Consequat interdum varius sit amet mattis vulputate enim. Aliquam nulla facilisi cras fermentum. Etiam sit amet nisl purus in mollis nunc. Eu nisl nunc mi ipsum. Diam maecenas ultricies mi eget mauris pharetra et ultrices. Sed odio morbi quis commodo odio. Odio euismod lacinia at quis risus sed vulputate odio ut. Lorem ipsum dolor sit amet. Ante metus dictum at tempor commodo ullamcorper a. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Nibh venenatis cras sed felis eget. Vel orci porta non pulvinar.",
        createdAt: now,
        updatedAt: now,
      },
      {
        title: "Volutpat est velit egestas dui id.",
        content:
          "Volutpat est velit egestas dui id. Vulputate enim nulla aliquet porttitor lacus luctus accumsan. Volutpat lacus laoreet non curabitur gravida arcu. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Aliquet enim tortor at auctor urna nunc id. Dui vivamus arcu felis bibendum ut tristique et egestas quis. Convallis aenean et tortor at risus viverra adipiscing. Morbi blandit cursus risus at ultrices. Adipiscing bibendum est ultricies integer quis. Aliquet risus feugiat in ante. Ut etiam sit amet nisl purus. Eros donec ac odio tempor orci dapibus ultrices in. Aliquet nec ullamcorper sit amet risus. Accumsan lacus vel facilisis volutpat est velit. Feugiat in fermentum posuere urna nec tincidunt praesent. Enim diam vulputate ut pharetra sit amet aliquam id. Donec ultrices tincidunt arcu non. Eu lobortis elementum nibh tellus molestie nunc non. Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie.",
        createdAt: now,
        updatedAt: now,
        logoPath: "v8.svg",
      },
      {
        title:
          "Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed.",
        content:
          "Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Parturient montes nascetur ridiculus mus. Dui accumsan sit amet nulla facilisi morbi. Morbi enim nunc faucibus a. Facilisis gravida neque convallis a cras. Consequat id porta nibh venenatis cras. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. Egestas congue quisque egestas diam in arcu cursus. Lacus sed turpis tincidunt id aliquet risus feugiat. Felis imperdiet proin fermentum leo. Eget gravida cum sociis natoque penatibus et magnis dis. Scelerisque eleifend donec pretium vulputate. Sit amet mattis vulputate enim nulla aliquet porttitor. Egestas integer eget aliquet nibh praesent tristique magna. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut.",
        createdAt: now,
        updatedAt: now,
      },
      {
        title: "Aenean vel elit scelerisque mauris pellentesque pulvinar.",
        content:
          "Aenean vel elit scelerisque mauris pellentesque pulvinar. Ultrices tincidunt arcu non sodales neque sodales ut etiam. Aenean pharetra magna ac placerat vestibulum. Id aliquet risus feugiat in ante metus dictum at tempor. Leo a diam sollicitudin tempor id eu. Iaculis urna id volutpat lacus laoreet non. Lectus magna fringilla urna porttitor rhoncus dolor purus. Nulla pharetra diam sit amet nisl. Elementum curabitur vitae nunc sed. Tempus urna et pharetra pharetra massa massa ultricies. In mollis nunc sed id semper risus in hendrerit gravida. Ultricies mi quis hendrerit dolor magna eget. Lectus vestibulum mattis ullamcorper velit. Arcu felis bibendum ut tristique et. In arcu cursus euismod quis. Quis auctor elit sed vulputate mi. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Hac habitasse platea dictumst quisque sagittis purus. Risus nullam eget felis eget nunc lobortis mattis. Dui ut ornare lectus sit amet est placerat in egestas.",
        createdAt: now,
        updatedAt: now,
      },
      {
        title: "Nisl rhoncus mattis rhoncus urna neque viverra justo nec",
        content:
          "Nisl rhoncus mattis rhoncus urna neque viverra justo nec. Sagittis orci a scelerisque purus semper eget duis at. In eu mi bibendum neque egestas congue quisque egestas diam. Sodales ut eu sem integer. Tincidunt vitae semper quis lectus nulla at volutpat diam ut. Neque gravida in fermentum et. Nunc vel risus commodo viverra. Leo urna molestie at elementum. Morbi tristique senectus et netus. Euismod elementum nisi quis eleifend quam adipiscing. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Proin fermentum leo vel orci porta non pulvinar neque laoreet. Nibh praesent tristique magna sit amet.",
        createdAt: now,
        updatedAt: now,
      },
      {
        title: "Amet nisl suscipit adipiscing bibendum.",
        content:
          "Amet nisl suscipit adipiscing bibendum. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Felis eget nunc lobortis mattis aliquam faucibus purus. Auctor urna nunc id cursus metus aliquam eleifend mi. Id ornare arcu odio ut sem. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Egestas purus viverra accumsan in nisl. Auctor elit sed vulputate mi sit amet. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Imperdiet dui accumsan sit amet nulla facilisi. Nunc sed id semper risus in hendrerit. Lectus quam id leo in vitae turpis massa sed elementum. Tempor orci eu lobortis elementum nibh tellus molestie. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Cursus turpis massa tincidunt dui ut ornare lectus. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque.",
        createdAt: now,
        updatedAt: now,
      },
      {
        title: "Tempus egestas sed sed risus pretium quam vulputate dignissim.",
        content:
          "Tempus egestas sed sed risus pretium quam vulputate dignissim. Dolor sit amet consectetur adipiscing elit. Nunc sed id semper risus in hendrerit. Justo nec ultrices dui sapien eget. Vestibulum sed arcu non odio euismod lacinia at quis. Eget arcu dictum varius duis. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Enim facilisis gravida neque convallis a cras semper auctor. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Facilisi morbi tempus iaculis urna id volutpat lacus.",
        createdAt: now,
        updatedAt: now,
        logoPath: "v8-liftoff.svg",
      },
      {
        title: "Eu sem integer vitae justo eget magna fermentum iaculis.",
        content:
          "Eu sem integer vitae justo eget magna fermentum iaculis. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Id diam vel quam elementum pulvinar etiam. Nisi porta lorem mollis aliquam ut porttitor leo a. Bibendum est ultricies integer quis auctor elit. Risus commodo viverra maecenas accumsan lacus. Accumsan lacus vel facilisis volutpat est velit. Amet luctus venenatis lectus magna fringilla. Tellus in metus vulputate eu scelerisque felis imperdiet. Auctor eu augue ut lectus arcu bibendum at. Quis hendrerit dolor magna eget est. Risus ultricies tristique nulla aliquet enim tortor at. Morbi tincidunt augue interdum velit euismod in pellentesque. Elementum sagittis vitae et leo. Massa ultricies mi quis hendrerit dolor.",
        createdAt: now,
        updatedAt: now,
        logoPath: "tanks.jpeg",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Posts", null);
  },
};
