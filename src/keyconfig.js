// key configuration for player

Player.prototype.key = new Key ({

  /* operate player */
  '<space>':       command.PlayPause ([]),
  '<c-space>':     '<space>',
  '<g-c-space>':   '<space>',
  '<c-right>':     command.NextMusic ([]),
  '<g-c-right>':   '<c-right>',
  '<c-left>':      command.PreviousMusic ([]),
  '<g-c-left>':    '<c-left>',
  '<c-o>':         command.OpenFile ([]),
  ':o':            '<c-o>', // vim
  ':e':            '<c-o>', // vim
  '<right>':       command.SeekForward (['10']),
  '<s-right>':     command.SeekForward (['30']),
  'l':             '<right>', // vim
  'w':             '<s-right>', // vim
  '<left>':        command.SeekBackward (['10']),
  '<s-left>':      command.SeekBackward (['30']),
  'h':             '<left>', // vim
  'b':             '<s-left>', // vim
  '<s-4>':         command.SeekPercent (['100']), // vim
  '<c-d>':         command.Interrupt ([]),

  /* change setting */
  '<c-r>':         command.ToggleRepeat ([]),
  '<c-u>':         command.ToggleShuffle ([]),

  /* volume */
  '<c-up>':        command.VolumeUp ([]),
  '<g-c-up>':      '<c-up>',
  '<c-down>':      command.VolumeDown ([]),
  '<g-c-down>':    '<c-down>',
  '<c-a-down>':    command.VolumeToggleMute ([]),
  '<g-c-a-down>':  '<c-a-down>',
  '9':             command.VolumeDown ([]), // mplayer
  '0':          command.VolumeUp ([]), // mplayer

  /* select, expand */
  '<down>':        command.SelectDown ([]),
  'j':             '<down>', // vim
  '<s-down>':      command.ExtendDown ([]),
  '<s-j>':         '<s-down>', // vim
  '<up>':          command.SelectUp ([]),
  'k':             '<up>', // vim
  '<s-up>':        command.ExtendUp ([]),
  '<s-k>':         '<s-up>', // vim
  '<home>':        command.SelectHome ([]),
  'gg':            '<home>', // vim
  // '0':             '<home>', // vim
  '<s-home>':      command.ExtendToHome ([]),
  '<end>':         command.SelectEnd ([]),
  '<s-g>':         '<end>', // vim
  '<s-end>':       command.ExtendToEnd ([]),
  '<c-a>':         command.SelectAll ([]),
  '<c-s-a>':       command.UnselectAll ([]),
  '<c-i>':         command.SelectInvert ([]),
  '<pgdn>':        command.PageDown ([]),
  // '<c-f>':         '<pgdn>', // vim
  '<s-pgdn>':      command.ExtendPageDown ([]),
  '<pgup>':        command.PageUp ([]),
  '<c-b>':         '<pgup>', // vim
  '<s-pgup>':      command.ExtendPageUp ([]),
  'np':            command.SelectNowplaying ([]),
  // 'v':             command.ShiftLock ([]), // vim // TODO

  /* toggle popup menu, ui */
  '<s-/>':         command.ToggleHelp ([]),
  '<f1>':          command.ToggleAbout ([]),
  '[':             '<f1>',
  '<c-,>':         command.OpenConfig ([]),
  '<delete>':      command.DeleteSelected ([]),
  '<c-]>':         command.DeleteAndNext ([]),
  '<backspace>':   '<delete>',
  'd':             '<delete>', // vim
  '<esc>':         command.Escape ([]),
  '<s-esc>':       '<esc>',
  '<c-[>':         '<esc>', // vim
  '<c-s-[>':       '<esc>', // vim
  '<enter>':       command.DefaultEnter ([]),
  '<a-enter>':     command.ViewInformation ([]),
  'pp':            command.ViewInformation ([]), // for enviroment <a-enter> doesn't work
  // '<tab>':         command.FocusToggle ([]),
  // '<s-tab>':       command.FocusToggleReverse ([]),
  '<tab>':         '<nop>', // disable traveling // TODO: disable tab key in input elem, too
  '<s-tab>':       '<nop>', // disable traveling
  'f':             command.FullScreenToggle ([]),
  '<c-s-f>':       'f',

  /* filter interface */
  '<c-f>':         command.FilterStart ([]),
  '/':             command.FilterStart ([]), // vim

  /* copy */
  '<c-a-c>':       command.CopyTitle ([]),
  '<c-s-c>':       command.CopyArtist ([]),
  '<c-c>':         command.CopyWithHashtag ([]),
  'yy':            command.CopyFilename ([]),

  /* special command */
  '<c-p>':         '<nop>', // disable browser mapping
  '<c-j>':         '<nop>', // disable browser mapping
  '<c-h>':         '<nop>', // disable browser mapping
  '<c-l>':         '<nop>', // disable browser mapping
  '<c-s>':         '<nop>', // disable browser mapping
  '<nop>':         command.Nop ([])

});


