
# gazelle:repo bazel_gazelle

workspace(name = "odict-web")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "odict",
    sha256 = "e540133567ed44d905934b40ed5f057763065e2b9d8294b049884969be615db0",
    strip_prefix = "odict-1.4.5",
    url = "https://github.com/TheOpenDictionary/odict/archive/1.4.5.tar.gz",
)

load("@odict//bazel:odict_deps.bzl", "odict_deps")

odict_deps()

load("@odict//bazel:odict_extra_deps.bzl", "odict_extra_deps")

odict_extra_deps()

load("@bazel_gazelle//:deps.bzl", "go_repository")

go_repository(
    name = "com_github_davecgh_go_spew",
    importpath = "github.com/davecgh/go-spew",
    sum = "h1:ZDRjVQ15GmhC3fiQ8ni8+OwkZQO4DARzQgrnXU1Liz8=",
    version = "v1.1.0",
)

go_repository(
    name = "com_github_iancoleman_strcase",
    importpath = "github.com/iancoleman/strcase",
    sum = "h1:ECW73yc9MY7935nNYXUkK7Dz17YuSUI9yqRqYS8aBww=",
    version = "v0.0.0-20190422225806-e506e3ef7365",
)

go_repository(
    name = "com_github_joho_godotenv",
    importpath = "github.com/joho/godotenv",
    sum = "h1:Zjp+RcGpHhGlrMbJzXTrZZPrWj+1vfm90La1wgB6Bhc=",
    version = "v1.3.0",
)

go_repository(
    name = "com_github_pmezard_go_difflib",
    importpath = "github.com/pmezard/go-difflib",
    sum = "h1:4DBwDE0NGyQoBHbLQYPwSUPoCMWR5BEzIk/f1lZbAQM=",
    version = "v1.0.0",
)

go_repository(
    name = "com_github_prisma_prisma_client_go",
    importpath = "github.com/prisma/prisma-client-go",
    sum = "h1:8h6JqXwEDdrkZ6XrN3EYvhNTuEhwAoHOFmASiBwnWuQ=",
    version = "v0.10.0",
)

go_repository(
    name = "com_github_shopspring_decimal",
    importpath = "github.com/shopspring/decimal",
    sum = "h1:abSATXmQEYyShuxI4/vyW3tV1MrKAJzCZ/0zLUXYbsQ=",
    version = "v1.2.0",
)

go_repository(
    name = "com_github_stretchr_objx",
    importpath = "github.com/stretchr/objx",
    sum = "h1:4G4v2dO3VZwixGIRoQ5Lfboy6nUhCyYzaqnIAPPhYs4=",
    version = "v0.1.0",
)

go_repository(
    name = "com_github_stretchr_testify",
    importpath = "github.com/stretchr/testify",
    sum = "h1:2E4SXV/wtOkTonXsotYi4li6zVWxYlZuYNCXe9XRJyk=",
    version = "v1.4.0",
)

go_repository(
    name = "com_github_takuoki_gocase",
    importpath = "github.com/takuoki/gocase",
    sum = "h1:gPwLJTWVm2T1kUiCsKirg/faaIUGVTI0FA3SYr75a44=",
    version = "v1.0.0",
)

go_repository(
    name = "in_gopkg_check_v1",
    importpath = "gopkg.in/check.v1",
    sum = "h1:yhCVgyC4o1eVCa2tZl7eS0r+SDo693bJlVdllGtEeKM=",
    version = "v0.0.0-20161208181325-20d25e280405",
)

go_repository(
    name = "in_gopkg_yaml_v2",
    importpath = "gopkg.in/yaml.v2",
    sum = "h1:ZCJp+EgiOT7lHqUV2J862kp8Qj64Jo6az82+3Td9dZw=",
    version = "v2.2.2",
)
