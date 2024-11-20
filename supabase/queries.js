const { createClient } = require("@supabase/supabase-js");

const { SUPABASEURL, SUPABASEKEY, BUCKETNAME } = process.env;
const supabase = createClient(SUPABASEURL, SUPABASEKEY);

const supabase_func = {
  deleteFile: async (fileUrl) => {
    return await supabase.storage.from(BUCKETNAME).remove([fileUrl]);
  },
  getPublicUrl: (fileUrl) => {
    return supabase.storage.from(BUCKETNAME).getPublicUrl(fileUrl);
  },
  uploadFile: async (filename, buffer, mimetype) => {
    return await supabase.storage.from(BUCKETNAME).upload(filename, buffer, {
      contentType: mimetype,
    });
  },
};

module.exports = supabase_func;
