<?php

namespace Bryntum\Util;

class ScriptEditor
{
    private static function getRegExp($region)
    {
        $startTag = "\s*--\s*region=$region";
        $endTag = "\s*--\s*endregion=$region";
        return "#$startTag(.*?)$endTag#s";
    }

    private static function matchTextRegion($text, $region, &$matches = null)
    {
        if (!$matches) $matches = [];

        $regexp = self::getRegExp($region);

        return preg_match($regexp, $text, $matches);
    }

    /**
     * Returns a region of the provided file.
     *
     * @param string  $file     File to get the region from.
     * @param string  $region   Region name. By default, the region will be searched as text between "-- region=$region" and "-- endregion=$region" strings.
     * @param array   &$matches If provided, will be fulfilled with internal preg_match call results.
     *
     * @return string|null Region text.
     */
    public static function getFileRegion($file, $region, &$matches = null)
    {
        if (!$matches) $matches = [];

        if (self::getTextRegion(file_get_contents($file), $region, $matches))
        {
            return $matches[1];
        }
        return null;
    }

    /**
     * Returns a region of the provided text.
     *
     * @param string $text     Text to get a region from.
     * @param string $region   Region name. By default, the region will be searched as text between "-- region=$region" and "-- endregion=$region" strings.
     * @param array  &$matches If provided, will be filled with internal preg_match call results.
     *
     * @return string|null Region text.
     */
    public static function getTextRegion($text, $region, &$matches = null)
    {
        if (!$matches) $matches = [];

        if (self::matchTextRegion($text, $region, $matches))
        {
            return $matches[1];
        }
        return null;
    }

    /**
     * Replaces a region in the provided text.
     *
     * @param string $text        Text to search and replace a region.
     * @param string $region      Region name. By default, the region will be searched as text between "-- region=$region" and "-- endregion=$region" strings.
     * @param string $replacement String to replace the region with. Defaults to an empty string.
     *
     * @return string New text.
     */
    public static function replaceTextRegion($text, $region, $replacement = '')
    {
        $regexp = self::getRegExp($region);

        return preg_replace($regexp, $replacement, $text);
    }
}
